import { useState } from "react"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export function SwitchChoiceCard({
  titulo,
  descripcion,
  checked,
  onChange, //funcion on change para cuando el usuario aprete el switch.
}: {
  titulo: string
  descripcion: string
  checked?: boolean
  onChange?: (checked: boolean) => void
}) {
  const [enabled, setEnabled] = useState(false)

  // Si nos pasan el prop `checked`, usamos ese. Si no, uso el estado local `enabled`.
  const isChecked = checked !== undefined ? checked : enabled;

  function handleChange(newChecked: boolean) {
    setEnabled(newChecked)
    onChange?.(newChecked) //cuando cambia el estado del swich actualiza la variable.
  }

  return (
    <FieldGroup className="w-full max-w-sm">
      <FieldLabel htmlFor="switch-share">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>{titulo}</FieldTitle>
            <FieldDescription>{descripcion}</FieldDescription>
          </FieldContent>
          <Switch
            id="switch"
            checked={isChecked}
            onCheckedChange={handleChange}
          />
        </Field>
      </FieldLabel>
    </FieldGroup>
  )
}