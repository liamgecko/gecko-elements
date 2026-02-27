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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"

export function AlertDialogPage() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Alert Dialog</h1>
          <p className="text-sm text-muted-foreground">
            A modal dialog that interrupts the user for confirmation, typically
            for destructive actions, unsaved changes, or save confirmation.
          </p>
        </PageSection>
        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Default and semantic variants for different alert dialog types.
          </p>
          <ComponentExample className="mb-6">
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="outline" />}>
                Open dialog
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Confirm deletion</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ComponentExample>
        </PageSection>
        <PageSection id="examples" label="Examples">
          <h2 className="text-lg font-semibold">Examples</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the variant prop to set the default action button style. Override
            button variant, text, and add icons via props and children.
          </p>
          <h3 className="mb-3 text-base font-semibold">Confirm deletion</h3>
          <ComponentExample className="mb-6">
            <AlertDialog variant="destructive">
              <AlertDialogTrigger render={<Button variant="outline" />}>
                Open dialog
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Confirm deletion</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ComponentExample>
          <h3 className="mb-3 text-base font-semibold">Unsaved changes</h3>
          <ComponentExample className="mb-6">
            <AlertDialog variant="unsaved-changes">
              <AlertDialogTrigger render={<Button variant="outline" />}>
                Open dialog
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>You have unsaved changes</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to leave this page? You have unsaved
                    changes, these will be lost unless you save your changes.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Discard changes</AlertDialogCancel>
                  <AlertDialogAction>Save changes</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ComponentExample>
          <h3 className="mb-3 text-base font-semibold">Confirm save</h3>
          <ComponentExample>
            <AlertDialog variant="confirm-save">
              <AlertDialogTrigger render={<Button variant="outline" />}>
                Open dialog
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm your changes</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to save your changes?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Save changes</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
