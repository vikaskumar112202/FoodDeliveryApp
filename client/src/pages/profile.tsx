import React from 'react';
import { useLocation } from 'wouter';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import CartSidebar from '@/components/layout/cart-sidebar';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Order } from '@shared/schema';
import { Helmet } from 'react-helmet';

export default function Profile() {
  const { isAuthenticated, user, logout } = useAuth();
  const [, navigate] = useLocation();
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ['/api/orders'],
    enabled: isAuthenticated,
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <>
      <Helmet>
        <title>My Profile - Foolivery</title>
        <meta name="description" content="View your Foolivery profile, order history, and account settings." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-poppins">Account Information</CardTitle>
                    <CardDescription>Manage your profile details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center mb-6">
                      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                        <span className="text-4xl font-medium">{user?.username.charAt(0).toUpperCase()}</span>
                      </div>
                      <h2 className="text-xl font-semibold">{user?.username}</h2>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Username</p>
                        <p>{user?.username}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Account ID</p>
                        <p>#{user?.id}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full text-primary border-primary hover:bg-primary/10"
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i> Logout
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="md:w-2/3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-poppins">Dashboard</CardTitle>
                    <CardDescription>View your orders and activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="orders">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="orders">Order History</TabsTrigger>
                        <TabsTrigger value="favorites">Favorites</TabsTrigger>
                      </TabsList>
                      <TabsContent value="orders" className="mt-6">
                        {isLoading ? (
                          <div className="text-center py-8">
                            <div className="animate-spin inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
                            <p>Loading your orders...</p>
                          </div>
                        ) : orders.length > 0 ? (
                          <div className="space-y-4">
                            {orders.map((order) => (
                              <Card key={order.id} className="overflow-hidden">
                                <div className="bg-gray-50 px-4 py-2 flex justify-between items-center">
                                  <div>
                                    <span className="text-sm font-medium">Order #{order.id}</span>
                                    <span className="text-xs text-gray-500 ml-3">{formatDate(order.createdAt)}</span>
                                  </div>
                                  <div>
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                      order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                      order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                                      'bg-yellow-100 text-yellow-700'
                                    }`}>
                                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                  </div>
                                </div>
                                <CardContent className="p-4">
                                  <div className="space-y-3">
                                    {order.items.map((item, index) => (
                                      <div key={index} className="flex justify-between items-center">
                                        <div className="flex items-center">
                                          <span className="bg-gray-100 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center mr-2">
                                            {item.quantity}
                                          </span>
                                          <span>{item.name}</span>
                                        </div>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                    <span className="font-medium">Total</span>
                                    <span className="font-medium">${order.total.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                                    <span>Payment Method</span>
                                    <span>Cash on Delivery</span>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <div className="text-gray-400 text-4xl mb-4">
                              <i className="fas fa-clipboard-list"></i>
                            </div>
                            <h3 className="text-lg font-medium mb-2">No Orders Yet</h3>
                            <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                            <Button 
                              className="bg-primary hover:bg-primary/90"
                              onClick={() => navigate('/')}
                            >
                              Browse Menu
                            </Button>
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="favorites" className="mt-6">
                        <div className="text-center py-8">
                          <div className="text-gray-400 text-4xl mb-4">
                            <i className="fas fa-heart"></i>
                          </div>
                          <h3 className="text-lg font-medium mb-2">No Favorites Yet</h3>
                          <p className="text-gray-500 mb-4">You haven't added any items to your favorites.</p>
                          <Button 
                            className="bg-primary hover:bg-primary/90"
                            onClick={() => navigate('/')}
                          >
                            Browse Menu
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <CartSidebar />
      </div>
    </>
  );
}
