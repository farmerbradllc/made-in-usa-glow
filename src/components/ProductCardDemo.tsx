
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import MadeInUSABadge, { MadeInUSAPositioned, MadeInUSABadgeProps } from '@/components/MadeInUSABadge';

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
}

interface ProductCardDemoProps {
  badgeConfig: MadeInUSABadgeProps;
}

const products: Product[] = [
  {
    id: 1,
    name: "American-Made Backpack",
    price: "$129.99",
    description: "Durable canvas backpack, proudly made in the USA",
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=300&h=220&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Handcrafted Watch",
    price: "$299.99",
    description: "Premium timepiece assembled in America",
    image: "https://images.unsplash.com/photo-1585123334904-845d60e97b29?q=80&w=300&h=220&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Leather Wallet",
    price: "$89.99",
    description: "Genuine leather wallet crafted in the USA",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=300&h=220&auto=format&fit=crop"
  },
];

const ProductCardDemo: React.FC<ProductCardDemoProps> = ({ badgeConfig }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[220px] object-cover"
            />
            <MadeInUSAPositioned {...badgeConfig} />
          </div>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.price}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{product.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <button className="px-4 py-2 bg-usa-blue text-white rounded hover:bg-blue-700">
              View Details
            </button>
            <button className="px-4 py-2 bg-usa-red text-white rounded hover:bg-red-700">
              Add to Cart
            </button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductCardDemo;
