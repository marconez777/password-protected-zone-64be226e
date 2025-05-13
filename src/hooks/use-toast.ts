
// In shadcn, this file is now the primary source for toast functionality
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast"

import {
  useToast as useToastInternal,
  toast as toastInternal,
} from "@/components/ui/toaster"

export const useToast = useToastInternal;
export const toast = toastInternal;

// For proper typing
export type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

export { type Toast, type ToastActionElement }
