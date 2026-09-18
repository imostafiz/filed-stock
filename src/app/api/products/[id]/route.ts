import { NextResponse } from 'next/server';
import products from '@/../data/products.json';

type RouteParams = {
  params: Promise<{ id: string }>;
};

export const GET = async (_request: Request, { params }: RouteParams) => {
  const { id } = await params;
  const product = products.find((p) => p.id === id || p.slug === id);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const related = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.tags.some((t) => product.tags.includes(t))),
    )
    .slice(0, 4);

  return NextResponse.json({ ...product, related });
};
