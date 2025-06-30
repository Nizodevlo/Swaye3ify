
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, User, Bell, Shield, CreditCard, Globe } from "lucide-react";

const AdminSettings = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage system configuration and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800">
          <TabsTrigger value="general" className="text-white data-[state=active]:bg-purple-600">
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-white data-[state=active]:bg-purple-600">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="text-white data-[state=active]:bg-purple-600">
            Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="text-white data-[state=active]:bg-purple-600">
            Billing
          </TabsTrigger>
          <TabsTrigger value="integrations" className="text-white data-[state=active]:bg-purple-600">
            Integrations
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6 mt-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="center-name" className="text-white">Center Name</Label>
                  <Input
                    id="center-name"
                    defaultValue="TutorHub Morocco"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="center-email" className="text-white">Contact Email</Label>
                  <Input
                    id="center-email"
                    type="email"
                    defaultValue="info@tutorhub.ma"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="center-phone" className="text-white">Phone Number</Label>
                  <Input
                    id="center-phone"
                    defaultValue="+212 5 22 00 00 00"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-white">Timezone</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="africa/casablanca">Africa/Casablanca</SelectItem>
                      <SelectItem value="europe/london">Europe/London</SelectItem>
                      <SelectItem value="america/new_york">America/New_York</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="center-address" className="text-white">Address</Label>
                <Textarea
                  id="center-address"
                  defaultValue="123 Avenue Mohammed V, Casablanca, Morocco"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <Button className="bg-purple-600 hover:bg-purple-700">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6 mt-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Email Notifications</h4>
                    <p className="text-gray-400 text-sm">Receive notifications via email</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">SMS Notifications</h4>
                    <p className="text-gray-400 text-sm">Receive notifications via SMS</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">New Student Registration</h4>
                    <p className="text-gray-400 text-sm">Notify when new students register</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Payment Notifications</h4>
                    <p className="text-gray-400 text-sm">Notify about payment activities</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Session Reminders</h4>
                    <p className="text-gray-400 text-sm">Send session reminders to tutors and students</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Button className="bg-purple-600 hover:bg-purple-700">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6 mt-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                    <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current-password" className="text-white">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-white">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-white">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Update Password
                </Button>
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  Generate Backup Codes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="space-y-6 mt-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Billing & Payments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="stripe-key" className="text-white">Stripe Publishable Key</Label>
                  <Input
                    id="stripe-key"
                    placeholder="pk_test_..."
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripe-secret" className="text-white">Stripe Secret Key</Label>
                  <Input
                    id="stripe-secret"
                    type="password"
                    placeholder="sk_test_..."
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Automatic Payment Reminders</h4>
                    <p className="text-gray-400 text-sm">Send reminders for overdue payments</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Late Payment Fees</h4>
                    <p className="text-gray-400 text-sm">Apply fees for late payments</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Button className="bg-purple-600 hover:bg-purple-700">
                Save Payment Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-6 mt-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Third-party Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Google Calendar</h4>
                    <p className="text-gray-400 text-sm">Sync sessions with Google Calendar</p>
                  </div>
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                    Connect
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Zoom</h4>
                    <p className="text-gray-400 text-sm">Enable online sessions via Zoom</p>
                  </div>
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                    Connect
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">WhatsApp Business</h4>
                    <p className="text-gray-400 text-sm">Send notifications via WhatsApp</p>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Connected
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Mailchimp</h4>
                    <p className="text-gray-400 text-sm">Manage email marketing campaigns</p>
                  </div>
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                    Connect
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
