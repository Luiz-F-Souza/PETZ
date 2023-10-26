# FORM

## InputBasic

O Componente traz estilos padrões e assessibilidades que podem ser sobrescritos conforme necessidade, basta utilizar o `className` e estilizar normalmente.

## USO

Normalmente utilziado como exemplo abaixo, em conjunto com `hookForms` e os demais componentes de formulário associados.

```tsx
            <FormLabel>
              <TextFormLabel>Nome</TextFormLabel>
              <InputBasic
                autoComplete="given-name"
                placeholder="Digite seu nome"
                className={`${errors.firstName ? "border-primary-500" : ""}`}
                {...register('firstName')}
              />
              <ErrorFeedback>{errors.firstName?.message}</ErrorFeedback>
            </FormLabel>
```

***

## Type

- `HTMLInputProps` (Todas as propriedades aceitas pelo input tradicional)
