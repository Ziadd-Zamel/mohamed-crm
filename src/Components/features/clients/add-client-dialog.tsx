"use client";

import { X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { FiPlus } from "react-icons/fi";
import { addClientAction } from "@/app/[locale]/(dashboard)/clients/_actions";
import { Button } from "@/Components/UI/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/Components/UI/dialog";
import { Input } from "@/Components/UI/input";
import { Label } from "@/Components/UI/label";
import { useRouter } from "@/i18n/navigation";

export default function AddClientDialog() {
  const t = useTranslations("Clients");
  const locale = useLocale();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="md" className="gap-2 rounded-lg">
          <FiPlus className="size-5" />
          {t("form.add")}
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="max-w-md gap-0 border-none bg-surface-raised p-0 sm:max-w-lg"
      >
        <div className="flex items-center justify-between border-b-[0.5px] border-border-default p-4 pb-3">
          <DialogTitle className="text-base font-semibold text-strong">
            {t("form.section")}
          </DialogTitle>
          <DialogClose asChild>
            <Button type="button" variant="gotht" size="icon-md" className="rounded-md">
              <X className="size-5" />
            </Button>
          </DialogClose>
        </div>

        <form
          action={(formData) => {
            startTransition(async () => {
              await addClientAction(formData);
              setOpen(false);
              router.refresh();
            });
          }}
        >
          <input type="hidden" name="locale" value={locale} />

          <div className="space-y-3 p-4">
            <div className="space-y-1.5">
              <Label htmlFor="client-name">{t("form.name")}</Label>
              <Input
                id="client-name"
                name="name"
                required
                inputSize="dashboard"
                radius="sm"
                placeholder={t("form.namePlaceholder")}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="client-notes">{t("form.notes")}</Label>
              <Input
                id="client-notes"
                name="notes"
                inputSize="dashboard"
                radius="sm"
                placeholder={t("form.notesPlaceholder")}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 border-t-[0.5px] border-border-default p-4">
            <Button
              type="submit"
              size="lg"
              className="min-w-[130px] rounded-lg"
              disabled={pending}
            >
              {t("form.add")}
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                variant="gotht"
                size="lg"
                className="min-w-[130px] rounded-lg"
                disabled={pending}
              >
                {t("form.cancel")}
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
