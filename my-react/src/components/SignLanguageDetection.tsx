import React, { useRef, useEffect, useState, useCallback } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { Hands, Results } from "@mediapipe/hands";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS } from "@mediapipe/hands";

interface DetectedSign {
  letter: string;
  confidence: number;
  timestamp: number;
}

const SignLanguageDetector: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detectedSigns, setDetectedSigns] = useState<DetectedSign[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>("");
  const [isDetecting, setIsDetecting] = useState(false);

  // Simple gesture recognition based on hand landmarks
  const recognizeGesture = useCallback((landmarks: any[]) => {
    if (!landmarks || landmarks.length === 0) return null;

    const hand = landmarks[0];

    // Get key landmark positions
    const thumb_tip = hand[4];
    const thumb_ip = hand[3];
    const index_tip = hand[8];
    const index_pip = hand[6];
    const middle_tip = hand[12];
    const middle_pip = hand[10];
    const ring_tip = hand[16];
    const ring_pip = hand[14];
    const pinky_tip = hand[20];
    const pinky_pip = hand[18];
    const wrist = hand[0];

    // Helper function to check if finger is extended
    const isFingerExtended = (tip: any, pip: any, wrist: any) => {
      return tip.y < pip.y && tip.y < wrist.y;
    };

    // Helper function to check if thumb is extended
    const isThumbExtended = (tip: any, ip: any) => {
      return tip.x > ip.x; // Assuming right hand
    };

    // Count extended fingers
    const extendedFingers = [
      isThumbExtended(thumb_tip, thumb_ip),
      isFingerExtended(index_tip, index_pip, wrist),
      isFingerExtended(middle_tip, middle_pip, wrist),
      isFingerExtended(ring_tip, ring_pip, wrist),
      isFingerExtended(pinky_tip, pinky_pip, wrist),
    ];

    const extendedCount = extendedFingers.filter(Boolean).length;

    // Simple gesture recognition
    if (extendedCount === 0) {
      return { letter: "A", confidence: 0.8 };
    } else if (extendedCount === 1 && extendedFingers[1]) {
      return { letter: "D", confidence: 0.8 };
    } else if (
      extendedCount === 2 &&
      extendedFingers[1] &&
      extendedFingers[2]
    ) {
      return { letter: "V", confidence: 0.8 };
    } else if (
      extendedCount === 3 &&
      extendedFingers[1] &&
      extendedFingers[2] &&
      extendedFingers[3]
    ) {
      return { letter: "W", confidence: 0.8 };
    } else if (extendedCount === 5) {
      return { letter: "B", confidence: 0.8 };
    } else if (extendedCount === 1 && extendedFingers[4]) {
      return { letter: "I", confidence: 0.8 };
    } else if (
      extendedCount === 2 &&
      extendedFingers[0] &&
      extendedFingers[4]
    ) {
      return { letter: "Y", confidence: 0.8 };
    }

    return null;
  }, []);

  const onResults = useCallback(
    (results: Results) => {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (!canvas || !video) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw video frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        // Draw hand landmarks
        for (const landmarks of results.multiHandLandmarks) {
          drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 2,
          });
          drawLandmarks(ctx, landmarks, {
            color: "#FF0000",
            lineWidth: 1,
            radius: 3,
          });
        }

        // Recognize gesture
        const gesture = recognizeGesture(results.multiHandLandmarks);
        if (gesture && isDetecting) {
          const newSign: DetectedSign = {
            ...gesture,
            timestamp: Date.now(),
          };

          setDetectedSigns((prev) => {
            const updated = [...prev, newSign].slice(-10); // Keep last 10 signs

            // Update subtitle with recent signs
            const recentSigns = updated.filter(
              (sign) => Date.now() - sign.timestamp < 3000 // Last 3 seconds
            );

            if (recentSigns.length > 0) {
              const subtitle = recentSigns.map((sign) => sign.letter).join("");
              setCurrentSubtitle(subtitle);
            }

            return updated;
          });
        }
      }
    },
    [recognizeGesture, isDetecting]
  );

  useEffect(() => {
    const initializeCamera = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) return;

        // Initialize MediaPipe Hands
        const hands = new Hands({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          },
        });

        hands.setOptions({
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        hands.onResults(onResults);

        // Initialize camera
        const camera = new Camera(video, {
          onFrame: async () => {
            await hands.send({ image: video });
          },
          width: 640,
          height: 480,
        });

        await camera.start();

        // Set canvas dimensions
        canvas.width = 640;
        canvas.height = 480;

        setIsLoading(false);
      } catch (err) {
        console.error("Error initializing camera:", err);
        setError(
          "Failed to initialize camera. Please ensure you have granted camera permissions."
        );
        setIsLoading(false);
      }
    };

    initializeCamera();
  }, [onResults]);

  const toggleDetection = () => {
    setIsDetecting(!isDetecting);
    if (!isDetecting) {
      setDetectedSigns([]);
      setCurrentSubtitle("");
    }
  };

  const clearSubtitle = () => {
    setDetectedSigns([]);
    setCurrentSubtitle("");
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Camera Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🤟 Real-time Sign Language Detection
          </h1>
          <p className="text-gray-600">
            Use hand gestures to create text subtitles in real-time
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Camera Feed */}
          <div className="relative bg-black">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p>Initializing camera...</p>
                </div>
              </div>
            )}

            <video
              ref={videoRef}
              className="hidden"
              autoPlay
              muted
              playsInline
            />

            <canvas
              ref={canvasRef}
              className="w-full h-auto max-h-96 object-contain"
            />

            {/* Subtitle Overlay */}
            {currentSubtitle && (
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg text-center">
                  <span className="text-lg font-mono">{currentSubtitle}</span>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="p-6 border-t">
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <button
                onClick={toggleDetection}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isDetecting
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {isDetecting ? "⏹️ Stop Detection" : "▶️ Start Detection"}
              </button>

              <button
                onClick={clearSubtitle}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
              >
                🗑️ Clear Subtitle
              </button>
            </div>

            {/* Status */}
            <div className="mt-4 text-center">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  isDetecting
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {isDetecting ? "🟢 Detecting" : "⚫ Stopped"}
              </span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            📋 Supported Gestures
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="font-bold text-lg">✊</div>
              <div className="font-semibold">A</div>
              <div className="text-gray-600">Closed fist</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="font-bold text-lg">👆</div>
              <div className="font-semibold">D</div>
              <div className="text-gray-600">Index finger up</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="font-bold text-lg">✌️</div>
              <div className="font-semibold">V</div>
              <div className="text-gray-600">Peace sign</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="font-bold text-lg">🖐️</div>
              <div className="font-semibold">B</div>
              <div className="text-gray-600">Open palm</div>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-4">
            💡 <strong>Tip:</strong> Hold gestures steady for better
            recognition. The system detects hand positions and converts them to
            letters in real-time.
          </p>
        </div>

        {/* Recent Detections */}
        {detectedSigns.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🔍 Recent Detections
            </h3>
            <div className="flex flex-wrap gap-2">
              {detectedSigns.slice(-10).map((sign, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {sign.letter}
                  <span className="ml-1 text-xs opacity-75">
                    {Math.round(sign.confidence * 100)}%
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignLanguageDetector;
