"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Order {
  id: string;
  orderDate: string;
  total: number;
  status: string;
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function fetchOrders() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("userId", user.id)
        .order("id", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setOrders(data);
      }

      setLoading(false);
    }

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <main>
      <h1 className="text-4xl mt-5 ml-8">Order History</h1>
      {orders.length === 0 ? (
        <p className="ml-8 mt-4">No orders found.</p>
      ) : (
        <div className="flex flex-col gap-4 mx-8 mt-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p>Order # {order.id}</p>
                <p>
                  {new Date(order.orderDate).toLocaleDateString("en-CA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p>Status: {order.status}</p>
              </div>
              <div className="flex items-center gap-6">
                <p>${order.total}</p>
                <Link href={`/orders/${order.id}`}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
