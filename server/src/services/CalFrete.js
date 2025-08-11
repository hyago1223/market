export default async function CalcularFrete(cep, peso, valor) {
  // Simulação de cálculo de frete
  const taxaFixa = 10.0; // Taxa fixa para o frete
  const taxaPorPeso = peso * 0.5; // Taxa por peso
  const taxaPorValor = valor * 0.02; // Taxa por valor

  // Cálculo total do frete
  const totalFrete = taxaFixa + taxaPorPeso + taxaPorValor;

  return {
    cep,
    peso,
    valor,
    totalFrete: totalFrete.toFixed(2), // Retorna o total formatado com duas casas decimais
  };
}