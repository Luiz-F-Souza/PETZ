
export const convertIntoConcurrency = (value: number) => {
  
  const formatted = Intl.NumberFormat('pt-BR',{
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2
  }).format(value)

  return formatted
}