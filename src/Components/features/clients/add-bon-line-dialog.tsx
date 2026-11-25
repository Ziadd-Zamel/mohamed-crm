"use client";

import { X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { FiPlus } from "react-icons/fi";
import { addBonLineAction } from "@/app/[locale]/(dashboard)/clients/_actions";
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

export default function AddBonLineDialog({
  clientId,
  bonId,
}: {
  clientId: string;
  bonId: string;
}) {
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
          {t("bonDetail.form.add")}
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="max-w-lg gap-0 border-none bg-surface-raised p-0 sm:max-w-xl"
      >
        <div className="flex items-center justify-between border-b-[0.5px] border-border-default p-4 pb-3">
          <DialogTitle className="text-base font-semibold text-strong">
            {t("bonDetail.form.add")}
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
              await addBonLineAction(formData);
              setOpen(false);
              router.refresh();
            });
          }}
        >
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="clientId" value={clientId} />
          <input type="hidden" name="bonId" value={bonId} />

          <div className="grid gap-3 p-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="line-material">{t("bonDetail.form.material")}</Label>
              <Input id="line-material" name="material" required inputSize="dashboard" radius="sm" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="line-finishing">{t("bonDetail.form.finishing")}</Label>
              <Input id="line-finishing" name="finishing" inputSize="dashboard" radius="sm" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="line-unit-price">{t("bonDetail.form.unitPrice")}</Label>
              <Input
                id="line-unit-price"
                name="unitPrice"
                type="number"
                step="0.01"
                min="0"
                defaultValue={0}
                inputSize="dashboard"
                radius="sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="line-quantity">{t("bonDetail.form.quantity")}</Label>
              <Input
                id="line-quantity"
                name="quantity"
                type="number"
                step="0.01"
                min="0"
                defaultValue={0}
                inputSize="dashboard"
                radius="sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="line-slabs">{t("bonDetail.form.slabs")}</Label>
              <Input
                id="line-slabs"
                name="slabCount"
                type="number"
                min="0"
                defaultValue={0}
                inputSize="dashboard"
                radius="sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="line-pallets">{t("bonDetail.form.pallets")}</Label>
              <Input
                id="line-pallets"
                name="palletCount"
                type="number"
                min="0"
                defaultValue={0}
                inputSize="dashboard"
                radius="sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="line-length">{t("bonDetail.form.length")}</Label>
              <Input
                id="line-length"
                name="length"
                type="number"
                step="0.01"
                min="0"
                inputSize="dashboard"
                radius="sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="line-width">{t("bonDetail.form.width")}</Label>
              <Input
                id="line-width"
                name="width"
                type="number"
                step="0.01"
                min="0"
                inputSize="dashboard"
                radius="sm"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="line-thickness">{t("bonDetail.form.thickness")}</Label>
              <Input
                id="line-thickness"
                name="thickness"
                type="number"
                step="0.01"
                min="0"
                inputSize="dashboard"
                radius="sm"
              />
            </div>
            <p className="text-xs text-weaker sm:col-span-2">{t("bonDetail.form.hint")}</p>
          </div>

          <div className="flex items-center justify-center gap-3 border-t-[0.5px] border-border-default p-4">
            <Button type="submit" size="lg" className="min-w-[130px] rounded-lg" disabled={pending}>
              {t("bonDetail.form.add")}
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
