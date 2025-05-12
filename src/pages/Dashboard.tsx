
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  BarChart3, 
  ChevronRight, 
  Clock, 
  CreditCard, 
  DollarSign, 
  Home, 
  LayoutDashboard, 
  LogOut, 
  Settings, 
  User, 
  Users
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const Dashboard = () => {
  const { session, user } = useAuth();
  const navigate = useNavigate();
  const [subscriptionData, setSubscriptionData] = useState<{ is_active: boolean, plan_type: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Sample data for charts
  const pieData = [
    { name: 'Used', value: 65 },
    { name: 'Available', value: 35 },
  ];
  
  const lineData = [
    { name: 'Jan', value: 12 },
    { name: 'Feb', value: 19 },
    { name: 'Mar', value: 15 },
    { name: 'Apr', value: 25 },
    { name: 'May', value: 32 },
    { name: 'Jun', value: 28 },
  ];
  
  const COLORS = ['#6366F1', '#E5E7EB'];

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!session) {
      navigate("/login");
      return;
    }

    // Check subscription status
    const checkSubscription = async () => {
      if (!user?.id) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("subscriptions")
          .select("is_active, plan_type")
          .eq("user_id", user.id)
          .single();

        if (error) {
          console.error("Error checking subscription:", error);
          navigate("/subscribe");
          return;
        }

        if (!data || !data.is_active) {
          navigate("/subscribe");
          return;
        }
        
        setSubscriptionData(data);
      } catch (err) {
        console.error("Error:", err);
        navigate("/subscribe");
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [session, user, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar variant="inset" side="left">
          <SidebarHeader className="flex items-center px-6 py-5 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-primary w-8 h-8 flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="text-lg font-medium">AppName</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive tooltip="Dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Analytics">
                  <BarChart3 />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Users">
                  <Users />
                  <span>Users</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="mt-auto border-t border-sidebar-border p-4">
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>
        
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-medium text-gray-800">Dashboard</h1>
              <p className="text-gray-500">Welcome, {user?.user_metadata?.full_name || "User"}</p>
            </div>
            <SidebarTrigger className="block md:hidden" />
            <div className="hidden md:flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Analyses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <span className="text-3xl font-medium">254</span>
                  <span className="ml-2 text-sm text-green-500 flex items-center">
                    +12%
                    <ChevronRight className="h-4 w-4 rotate-90" />
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Compared to last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Keywords Researched</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <span className="text-3xl font-medium">1,423</span>
                  <span className="ml-2 text-sm text-green-500 flex items-center">
                    +5%
                    <ChevronRight className="h-4 w-4 rotate-90" />
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Compared to last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Usage Limits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <span className="text-3xl font-medium">65%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Of monthly quota used</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Usage Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ChartContainer config={{}}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartLegend verticalAlign="bottom" height={36} content={renderLegend} />
                    </PieChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Activity Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ChartContainer config={{}}>
                    <LineChart data={lineData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#6366F1" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Subscription Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
                      <span>Plan Type</span>
                    </div>
                    <span className="font-medium">{subscriptionData?.plan_type || 'Monthly'}</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-gray-500" />
                      <span>Status</span>
                    </div>
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-gray-500" />
                      <span>Next Billing</span>
                    </div>
                    <span className="font-medium">June 10, 2025</span>
                  </div>
                  <Button className="w-full mt-4">Manage Subscription</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Account Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-2 text-gray-500" />
                      <span>Full Name</span>
                    </div>
                    <span className="font-medium">{user?.user_metadata?.full_name || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Home className="w-5 h-5 mr-2 text-gray-500" />
                      <span>Email</span>
                    </div>
                    <span className="font-medium">{user?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-gray-500" />
                      <span>Member Since</span>
                    </div>
                    <span className="font-medium">{new Date(user?.created_at).toLocaleDateString()}</span>
                  </div>
                  <Button variant="outline" className="w-full mt-4">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

// Custom legend component for the pie chart
const renderLegend = (props: any) => {
  const { payload } = props;
  
  return (
    <div className="flex justify-center mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center mx-4">
          <div 
            className="w-3 h-3 rounded-sm mr-2" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-gray-600">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
