"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface OrderItem {
  id: string;
  bookId: string;
  qty: number;
  price: number;
  books: {
    title: string;
    author: string;
    coverUrl: string;
  };
}

interface Order {
  id: string;
  orderDate: string;
  total: number;
  status: string;
}

export default function OrderDetail({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function fetchOrder() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // Fetch order
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", params.id)
        .single();

      if (orderError) {
        console.error(orderError.message);
        return;
      }

      setOrder(orderData);

      // Fetch order items, joining with books table for book details
      const { data: itemData, error: itemError } = await supabase
        .from("orderItems")
        .select("*, books(title, author, coverUrl)")
        .eq("orderId", params.id);

      if (itemError) {
        console.error(itemError.message);
      } else {
        setItems(itemData);
      }

      setLoading(false);
    }

    fetchOrder();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (!order) return <div>Order not found.</div>;

  return (
    <main>
      <div className="mx-8 mt-5">
        <Link href="/orders">← Back to Order History</Link>
        <h1 className="text-4xl mt-3">Order # {order.id}</h1>
        <p>{new Date(order.orderDate).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}</p>
        <p>Status: {order.status}</p>
        <p>Total: ${order.total}</p>

        <h2 className="text-2xl mt-6 mb-3">Items</h2>
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 flex gap-4 items-center">
              <img
                src={item.books.coverUrl}
                alt={item.books.title}
                className="h-24 w-16 object-contain"
              />
              <div className="flex flex-1 justify-between items-center">
                <div>
                  <p className="text-xl">{item.books.title}</p>
                  <p>{item.books.author}</p>
                  <p>Qty: {item.qty}</p>
                </div>
                <p className="text-xl">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}