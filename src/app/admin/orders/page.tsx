import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Orders</h1>
        <p className="text-muted-foreground">Monitor and manage all campus orders in real-time.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b bg-muted/50">
                <tr className="border-b transition-colors">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date & Time</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Vendor</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Items</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium text-primary">#ORD-9912</td>
                  <td className="p-4 align-middle text-muted-foreground">Today, 2:30 PM</td>
                  <td className="p-4 align-middle">Rahul Sharma<br/><span className="text-xs text-muted-foreground">Hostel 3, Room 204</span></td>
                  <td className="p-4 align-middle font-medium">Super Cremica Sweets</td>
                  <td className="p-4 align-middle text-muted-foreground">2x Rasmalai, 1x Ghewar</td>
                  <td className="p-4 align-middle"><span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800">Pending</span></td>
                  <td className="p-4 align-middle text-right font-bold">₹450</td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium text-primary">#ORD-9911</td>
                  <td className="p-4 align-middle text-muted-foreground">Today, 2:15 PM</td>
                  <td className="p-4 align-middle">Neha Singh<br/><span className="text-xs text-muted-foreground">GH-1, Room 102</span></td>
                  <td className="p-4 align-middle font-medium">Bikanervala</td>
                  <td className="p-4 align-middle text-muted-foreground">1x Veg Burger, 1x Fries</td>
                  <td className="p-4 align-middle"><span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800">Preparing</span></td>
                  <td className="p-4 align-middle text-right font-bold">₹290</td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium text-primary">#ORD-9910</td>
                  <td className="p-4 align-middle text-muted-foreground">Today, 1:45 PM</td>
                  <td className="p-4 align-middle">Amit Kumar<br/><span className="text-xs text-muted-foreground">Mega Hostel, Room 512</span></td>
                  <td className="p-4 align-middle font-medium">Shahi Daawat Dhaba</td>
                  <td className="p-4 align-middle text-muted-foreground">1x Chicken Biryani (Full), 2x Rumali Roti</td>
                  <td className="p-4 align-middle"><span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">Delivered</span></td>
                  <td className="p-4 align-middle text-right font-bold">₹820</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
