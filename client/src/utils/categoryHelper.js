export default function CategoryHelper(category, items) {
 if(category){
  return items.filter((item) => item.category === category);
 }
 return items
}
