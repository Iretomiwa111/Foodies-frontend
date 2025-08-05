import { useEffect, useState } from "react";
import { privateApiClient } from "@/lib/client";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Users, Loader2 } from "lucide-react";

const ReservationsTab = () => {
  const { toast } = useToast();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await privateApiClient.get("/reservations/me");
        setReservations(res.data.reservations);
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Failed to fetch reservations",
          description: err?.response?.data?.message || "Something went wrong.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [toast]);

  const handleCancel = async (id) => {
    try {
      setCancelingId(id);
      await privateApiClient.delete(`/reservations/${id}`);
      setReservations((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "cancelled" } : r))
      );
      toast({ title: "Reservation cancelled" });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Cancellation failed",
        description: err?.response?.data?.message || "Server error",
      });
    } finally {
      setCancelingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <p className="text-black text-sm text-center">
        You haven’t made any reservations yet.
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {reservations.map((res) => (
        <Card key={res._id} className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2 text-base font-medium tracking-wider text-black">
              <CalendarClock className="w-5 h-5 text-blue-600" />
              {res.date} at {res.time}
            </div>
            <Badge
              variant={
                res.status === "confirmed"
                  ? "default"
                  : res.status === "cancelled"
                  ? "secondary"
                  : "outline"
              }
              className={
                res.status === "confirmed"
                  ? "bg-green-600 text-white  tracking-widest"
                  : res.status === "cancelled"
                  ? "bg-gray-500 text-white  tracking-widest"
                  : "bg-yellow-500 text-white tracking-widest"
              }
            >
              {res.status}
            </Badge>
          </CardHeader>

          <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <p className="text-black dark:text-gray-300 flex items-center gap-1 text-sm">
              <Users className="w-4 h-4  text-black" /> Guests: {res.guests}
            </p>

            {res.status !== "cancelled" && (
              <Button
                variant="destructive"
                size="sm"
                className="mt-3 sm:mt-0"
                onClick={() => handleCancel(res._id)}
                disabled={cancelingId === res._id}
              >
                {cancelingId === res._id && (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                )}
                Cancel
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReservationsTab;
