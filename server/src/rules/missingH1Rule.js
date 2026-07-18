export function missingH1Rule(
  document
) {
  const h1 =
    document.querySelector("h1");

  if (h1) {
    return [];
  }

  return [
    {
      criterion: "1.3.1",
      level: "A",
      severity: "medium",
      issue:
        "Page missing H1 heading",
      affectedUsers: [
        "Screen reader users",
      ],
      recommendation:
        "Ensure every page has a single meaningful H1 heading.",
    },
  ];
}