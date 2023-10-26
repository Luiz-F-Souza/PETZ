# FORM

## InputBasic

O Componente traz estilos padrões e assessibilidades que podem ser sobrescritos conforme necessidade, basta utilizar o `className` e estilizar normalmente.

O InputBasic traz uma série de funcionalidades como navegação por teclado, filtro de nomes digitados, validação para que um nome digitado que não esteja presente nas opções não seja selecionado, etc.

## USO

Obrigatório uso com `hookForms` e dentro de um `FormProvider`, pois internamente utiliza o `useFormContext`. Normalmente associado com os demais componentes de formulário associados.

```tsx
            <FormLabel className="">
              <TextFormLabel>Região</TextFormLabel>

              <SelectBasic
                placeholder="Selecione a região"
                autoComplete="none"
                options={pokeRegions}
                className={`${errors.region ? "border-primary-500" : ""}`}
                {...register("region")}
              />

              <ErrorFeedback>{errors.region?.message}</ErrorFeedback>
            </FormLabel>
```

***

## Type

- `HTMLInputProps` (Todas as propriedades aceitas pelo input tradicional)
- `options: SelectOptionsFormatType` =>

```ts
  type SelectSingleOptionFormatType = {
    label: string,
    value: string,
    id: string
  }[]
```
