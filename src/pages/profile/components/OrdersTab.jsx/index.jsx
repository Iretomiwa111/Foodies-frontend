import { useEffect, useState } from "react";
import { privateApiClient } from "@/lib/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, CalendarDays, Loader2 } from "lucide-react";

const OrdersTab = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await privateApiClient.get("/orders/me");
        setOrders(res.data.orders);
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Failed to load orders",
          description: err?.response?.data?.message || "Something went wrong",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [toast]);

  const handleCancel = async (id) => {
    try {
      setCanceling(id);
      await privateApiClient.delete(`/orders/${id}`);
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status: "cancelled" } : o))
      );
      toast({ title: "Order cancelled successfully" });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Cancel failed",
        description: err?.response?.data?.message || "Server error",
      });
    } finally {
      setCanceling(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <p className=" text-sm text-center text-black">
        No orders found.
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {orders.map((order) => (
        <Card key={order._id}>
          <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              Order #{order._id.slice(-6).toUpperCase()}
            </div>
            <Badge
              className={
                order.status === "delivered"
                  ? "bg-green-700 text-white tracking-widest"
                  : order.status === "cancelled"
                    ? "bg-gray-500 text-white tracking-widest"
                    : "bg-yellow-600 text-white tracking-widest"
              }
            >
              {order.status}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-4 text-sm text-black tracking-wider">
            <div>
              <CalendarDays className="inline-block w-4 h-4 mr-1" />
              {new Date(order.createdAt).toLocaleDateString()}
            </div>

            <Separator />

            <div className="space-y-1">
              <p className="font-medium">Items :</p>
              {order.items?.length > 0 ? (
                order.items.map((item, index) => (
                  <p key={index} className="text-base">
                    {item.name || "Unnamed item"} × {item.quantity} — ₦
                    {(item.price * item.quantity).toLocaleString()}
                  </p>
                ))
              ) : (
                <p className="text-sm text-black">No items found</p>
              )}
            </div>

            <p className="text-base tracking-wider font-semibold">
              Subtotal: ₦
              {order.items
                ?.reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toLocaleString()}
            </p>

            <Separator />

            <div className="space-y-1 text-sm mt-2">
              <p className="font-medium tracking-wide">Delivery Info :</p>
              <p className="tracking-wider">
                <strong>Name:</strong> {order.deliveryInfo?.name || "N/A"}
              </p>
              <p className="tracking-wider">
                <strong>Address:</strong> {order.deliveryInfo?.address || "N/A"}
              </p>
              <p className="tracking-wider">
                <strong>Phone:</strong> {order.deliveryInfo?.phone || "N/A"}
              </p>
            </div>

            {order.notes && (
              <>
                <Separator />
                <div className="tracking-wider">
                  <p className="font-medium text-gray-700 dark:text-gray-200">
                    Notes:
                  </p>
                  <p  className="ml-2 italic text-gray-600 dark:text-gray-300">
                    {order.notes}
                  </p>
                </div>
              </>
            )}

            <Separator />

            <p className="text-base font-semibold text-black dark:text-white">
              Total: ₦
              {typeof order.totalAmount === "number"
                ? order.totalAmount.toLocaleString()
                : "N/A"}
            </p>

            {order.status !== "cancelled" && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleCancel(order._id)}
                disabled={canceling === order._id}
              >
                {canceling === order._id && (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                )}
                Cancel Order
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrdersTab;
