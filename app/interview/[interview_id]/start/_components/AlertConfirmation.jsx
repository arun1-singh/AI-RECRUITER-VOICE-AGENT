'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { motion } from 'framer-motion';

function AlertConfirmation({ children, stopInterview }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent
        asChild
        className="rounded-xl backdrop-blur-md border border-white/10 bg-black/70 text-white shadow-2xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="p-6"
        >
          <AlertDialogHeader className="space-y-2">
            <AlertDialogTitle asChild>
              <motion.h2
                className="text-2xl font-bold bg-gradient-to-r from-red-500 via-pink-400 to-yellow-300 bg-clip-text text-transparent animate-pulse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Are you absolutely sure?
              </motion.h2>
            </AlertDialogTitle>

            <AlertDialogDescription className="text-sm text-gray-300">
              This action cannot be undone. Your interview will end.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-6 flex justify-end gap-4">
            <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
              <AlertDialogCancel className="px-5 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg shadow hover:shadow-lg transition duration-200">
                Cancel
              </AlertDialogCancel>
            </motion.div>

            <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.1 }}>
              <AlertDialogAction
                onClick={() => stopInterview()}
                className="px-5 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
              >
                Continue
              </AlertDialogAction>
            </motion.div>
          </AlertDialogFooter>
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertConfirmation;
