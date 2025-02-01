import { create, useModal } from "@ebay/nice-modal-react";
import Button from "@/components/chromia-ui-kit/button";
import ErrorIcon from "@/components/icons/error";
import { DrawerDialog } from "@/components/ui/drawer-dialog";
import TadaBg from "@/components/ui/tada-bg";

// Create a modal for displaying transaction failure information
const TransactionFailedModal = create<{ amount: number; ticker: string }>(
  ({ amount, ticker }) => {
    const modal = useModal(); // Modal instance to manage visibility and interactions

    return (
      <DrawerDialog
        visuallyHiddenTitle  // Title for accessibility purposes (screen readers)
        DialogContentProps={{ "aria-describedby": undefined }} // ARIA attributes for accessibility
        footer={
          // Footer with a retry button
          <Button variant="secondary" onClick={modal.hide}>
            Try again
          </Button>
        }
        open={modal.visible}  // Control modal visibility based on `modal.visible`
        title="Transaction Failed"  // Modal title
        onOpenChange={modal.hide}  // Close the modal when open state changes
      >
        <div className="space-y-6">
          <div className="grid place-items-center">
            {/* Background and error icon */}
            <TadaBg className="max-w-full" />
            <ErrorIcon className="absolute scale-y-75 text-[6rem] opacity-60 blur-2xl" />
            <ErrorIcon className="absolute text-[6rem]" />
          </div>
          <div>
            <p className="text-center text-xs text-muted-foreground">
              {/* Display message when the transaction fails */}
              This request is currently unavailable.
              <br />
              Please try again later.
            </p>
            <p className="text-center font-serif text-3xl font-bold text-accent">
              {/* Display the failed transaction amount and currency ticker */}
              {Intl.NumberFormat().format(amount)} {ticker.toUpperCase()}
            </p>
          </div>
        </div>
      </DrawerDialog>
    );
  },
);

// Hook to expose the modal for external usage (i.e., show/hide modal from other components)
export const useTransactionFailedModal = () => {
  const modal = useModal(TransactionFailedModal);

  return modal; // Return modal instance for usage in the component
};
