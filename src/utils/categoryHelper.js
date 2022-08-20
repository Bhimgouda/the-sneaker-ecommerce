export default function CategoryHelper(category, items) {
  return items.filter((item) => item.category === category);
}
