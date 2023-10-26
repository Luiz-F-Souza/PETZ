# FORM

## ErrorFeedback

O Componente traz estilos padrões e assessibilidades que podem ser sobrescritos conforme necessidade, basta utilizar o `className` e estilizar normalmente.

## USO

Normalmente utilziado como exemplo abaixo, em conjunto com `hookForms` e os demais componentes de formulário associados.
Caso não esteja usando com `hookForms` bast alterar `{errors.firstName?.message}` pela mensagem que desejar.

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

- `children: string | undefined`.
