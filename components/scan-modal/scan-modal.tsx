"use client";

import { Guest } from "@/types";
import { X, User, Users, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScanModalProps {
  guest: Guest & { isConfirmed: boolean };
  isOpen: boolean;
  onClose: () => void;
}

export function ScanModal({ guest, isOpen, onClose }: ScanModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 space-y-6 animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <User className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-cormorant text-gray-900 dark:text-white">
            Información del Invitado
          </h2>
        </div>

        {/* Guest Information */}
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="space-y-3">
              <div>
                <label className="text-lg font-bold text-gray-500 dark:text-gray-400">
                  Nombre
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                  {guest.name}
                </p>
              </div>

              <div>
                <label className="text-lg font-bold text-gray-500 dark:text-gray-400">
                  Número de Mesa:
                </label>
                <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                  {guest.tableNumber ?? "Por asignar"}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Número de Invitados
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <Users className="w-4 h-4 text-gray-400" />
                  <p className="text-sm text-gray-900 dark:text-white">
                    {guest.numberOfGuests} / {guest.maxNumberOfGuests}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Estado de Confirmación
                </label>
                <div className="flex items-center gap-2 mt-1">
                  {guest.isConfirmed ? (
                    <>
                      {guest.going ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <p className="text-sm text-green-600 font-medium">
                            Confirmado - Asistirá
                          </p>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-600" />
                          <p className="text-sm text-red-600 font-medium">
                            Confirmado - No asistirá
                          </p>
                        </>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Pendiente de confirmación
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={onClose} className="flex-1" variant="outline">
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}

