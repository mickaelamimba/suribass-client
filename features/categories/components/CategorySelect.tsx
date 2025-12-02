import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown, X } from "lucide-react"
import * as React from "react"
import { useCategories } from "../hooks/useCategories"

interface CategorySelectProps {
  value: string | undefined
  onValueChange: (value: string | undefined) => void
  placeholder?: string
  allowClear?: boolean
}

export function CategorySelect({
  value,
  onValueChange,
  placeholder = "Sélectionner une catégorie...",
  allowClear = true,
}: CategorySelectProps) {
  const [open, setOpen] = React.useState(false)
  const { categories, isLoading } = useCategories()

  const selectedCategory = categories.find((category) => category.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={isLoading}
        >
          <span className="truncate">
            {value ? selectedCategory?.name : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Rechercher une catégorie..." />
          <CommandList>
            <CommandEmpty>Aucune catégorie trouvée.</CommandEmpty>
            {allowClear && value && (
              <>
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      onValueChange(undefined)
                      setOpen(false)
                    }}
                    className="text-muted-foreground"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Toutes les catégories
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
              </>
            )}
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.name}
                  onSelect={() => {
                    onValueChange(category.id)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
