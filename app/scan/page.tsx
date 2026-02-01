"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { QrCode, Camera, X } from "lucide-react";
import { toast } from "sonner";
import { ScanModal } from "@/components/scan-modal/scan-modal";
import { Guest } from "@/types";

export default function ScanPage() {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [guest, setGuest] = useState<(Guest & { isConfirmed: boolean }) | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingGuest, setIsLoadingGuest] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isCleaningRef = useRef(false);

  const cleanupScanner = useCallback(async () => {
    if (scannerRef.current && !isCleaningRef.current) {
      isCleaningRef.current = true;
      try {
        await scannerRef.current.clear();
      } catch (error) {
        // Ignore cleanup errors - the scanner might already be cleared
        console.warn("Scanner cleanup warning:", error);
      } finally {
        scannerRef.current = null;
        isCleaningRef.current = false;
      }
    }
  }, []);

  const startScan = useCallback(() => {
    setScannedData(null);
    setScanning(true);
  }, []);

  useEffect(() => {
    if (!scanning) return;
    if (scannerRef.current) return;

    const initializeScanner = async () => {
      // Clean up existing scanner if any
      await cleanupScanner();

      // Wait for React to finish rendering - use multiple frames
      await new Promise((resolve) =>
        requestAnimationFrame(() => resolve(undefined))
      );
      await new Promise((resolve) =>
        requestAnimationFrame(() => resolve(undefined))
      );
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Verify element exists - try multiple methods
      let container = containerRef.current;
      if (!container) {
        container = document.getElementById(
          "qr-reader"
        ) as HTMLDivElement | null;
      }

      if (!container) {
        console.error("Container element not found");
        setScanning(false);
        toast.error("Error: No se pudo encontrar el contenedor del escáner");
        return;
      }

      // Ensure the element is still in the DOM
      if (!container.isConnected) {
        console.error("Container element not connected to DOM");
        setScanning(false);
        toast.error("Error: El contenedor no está conectado al DOM");
        return;
      }

      // Clear the container to ensure clean state
      container.innerHTML = "";

      try {
        const scanner = new Html5QrcodeScanner(
          "qr-reader",
          {
            qrbox: { width: 250, height: 250 },
            fps: 10,
            aspectRatio: 1.0,
            videoConstraints: {
              facingMode: "environment", // Use back camera on mobile
            },
          },
          false // verbose
        );

        scanner.render(
          async (decodedText) => {
            // Success callback
            setScannedData(decodedText);
            setScanning(false);
            await cleanupScanner();

            // Fetch guest information
            setIsLoadingGuest(true);
            try {
              const response = await fetch(
                `/api/invite?code=${encodeURIComponent(decodedText)}`
              );

              if (response.ok) {
                const guestData = await response.json();
                setGuest(guestData);
                setIsModalOpen(true);
                toast.success("QR Code escaneado exitosamente");
              } else {
                const error = await response.json();
                toast.error(error.error || "Código no encontrado");
              }
            } catch (error) {
              console.error("Error fetching guest data:", error);
              toast.error("Error al obtener la información del invitado");
            } finally {
              setIsLoadingGuest(false);
            }
          },
          (_errorMessage) => {
            // Error callback - don't show errors, they're just scanning attempts
          }
        );

        scannerRef.current = scanner;
      } catch (error) {
        console.error("Error starting scanner:", error);
        setScanning(false);
        toast.error("Error al iniciar el escáner");
      }
    };

    initializeScanner();

    // Cleanup function
    return () => {
      if (scannerRef.current) {
        cleanupScanner();
      }
    };
  }, [cleanupScanner, scanning]);

  const stopScan = useCallback(async () => {
    await cleanupScanner();
    setScanning(false);
    setScannedData(null);
    setGuest(null);
    setIsModalOpen(false);

    // Clear the container
    const container =
      containerRef.current || document.getElementById("qr-reader");
    if (container) {
      container.innerHTML = "";
    }
  }, [cleanupScanner]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setGuest(null);
  }, []);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      cleanupScanner();
      const container =
        containerRef.current || document.getElementById("qr-reader");
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [cleanupScanner]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <QrCode className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-cormorant text-gray-900 dark:text-white">
              Escanear QR Code
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Permite acceso a la cámara para escanear un código QR
            </p>
          </div>

          {/* Scanner Container */}
          <div className="space-y-4">
            <div
              id="qr-reader"
              ref={containerRef}
              className="w-full min-h-[300px] rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 relative"
            >
              {!scanning && !scannedData && scannerRef.current === null && (
                <div className="absolute inset-0 flex items-center justify-center text-center p-8 space-y-4 pointer-events-none z-10">
                  <div>
                    <Camera className="w-16 h-16 text-gray-400 mx-auto" />
                    <p className="text-gray-500 dark:text-gray-400 mt-4">
                      Presiona el botón para iniciar el escáner
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            {!scanning && !scannedData && (
              <Button onClick={startScan} className="w-full" size="lg">
                <Camera className="w-5 h-5 mr-2" />
                Iniciar Escáner
              </Button>
            )}

            {scanning && (
              <Button
                onClick={stopScan}
                variant="destructive"
                className="w-full"
                size="lg"
              >
                <X className="w-5 h-5 mr-2" />
                Detener Escáner
              </Button>
            )}

            {/* Scanned Result */}
            {scannedData && (
              <div className="space-y-4 p-4 rounded-lg border">
                <div className="flex gap-1">
                  <Button
                    onClick={() => {
                      setScannedData(null);
                      setGuest(null);
                      setIsModalOpen(false);
                      startScan();
                    }}
                    variant="default"
                    size="sm"
                    className="flex-1"
                  >
                    Escanear Otro
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="font-semibold">Instrucciones:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Haz clic en &quot;Iniciar Escáner&quot;</li>
              <li>Permite el acceso a la cámara cuando se solicite</li>
              <li>Apunta la cámara hacia el código QR</li>
              <li>El código se escaneará automáticamente</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Guest Information Modal */}
      {guest && (
        <ScanModal
          guest={guest}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      {/* Loading overlay */}
      {isLoadingGuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <p className="text-gray-900 dark:text-white">
              Cargando información...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
