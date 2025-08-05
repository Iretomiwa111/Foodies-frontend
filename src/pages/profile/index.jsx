// import { Tabs, TabsContent } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { motion as Motion } from "framer-motion";
// import { useState } from "react";
// import { User, CalendarCheck, ShoppingBag, Settings } from "lucide-react";

// import ProfileTab from "./components/ProfilesTab";
// import ReservationsTab from "./components/ReservationsTabs";
// import OrdersTab from "./components/OrdersTab.jsx";
// import SettingsTab from "./components/Settings.jsx";

// const tabs = [
//   { value: "profile", label: "Profile", icon: User },
//   { value: "reservations", label: "Reservations", icon: CalendarCheck },
//   { value: "orders", label: "Orders", icon: ShoppingBag },
//   { value: "settings", label: "Settings", icon: Settings },
// ];

// const tabFade = {
//   initial: { opacity: 0, y: 10 },
//   animate: { opacity: 1, y: 0 },
//   exit: { opacity: 0, y: -10 },
// };

// const Profile = () => {
//   const [activeTab, setActiveTab] = useState("profile");

//   return (
//     <div className="min-h-screen px-4 py-8 md:px-10 bg-[#ffffff] text-foreground">
//       <h2 className="text-4xl font-bold mb-8 tracking-wide">Account Dashboard</h2>
//       <Tabs
//         value={activeTab}
//         onValueChange={setActiveTab}
//         className="flex flex-col md:flex-row gap-6 tracking-wider"
//       >
//         {/* Responsive Sidebar */}
//         <aside className="w-full md:w-64 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
//           {tabs.map(({ value, label, icon: Icon }) => (
//             <Button
//               key={value}
//               variant={activeTab === value ? "default" : "ghost"}
//               onClick={() => setActiveTab(value)}
//               className="flex-shrink-0 md:w-full justify-start md:justify-start gap-2"
//             >
//               <Icon className="w-5 h-5" />
//               <span className="inline tracking-wider">{label}</span>

//             </Button>
//           ))}
//         </aside>

//         {/* Main Content */}
//         <div className="flex-1 ">
//           <TabsContent value="profile">
//             {activeTab === "profile" && (
//               <Motion.div
//                 variants={tabFade}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 transition={{ duration: 0.3 }}
//               >
//                 <ProfileTab />
//               </Motion.div>
//             )}
//           </TabsContent>

//           <TabsContent value="reservations">
//             {activeTab === "reservations" && (
//               <Motion.div
//                 variants={tabFade}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 transition={{ duration: 0.3 }}
//               >
//                 <ReservationsTab />
//               </Motion.div>
//             )}
//           </TabsContent>

//           <TabsContent value="orders">
//             {activeTab === "orders" && (
//               <Motion.div
//                 variants={tabFade}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 transition={{ duration: 0.3 }}
//               >
//                 <OrdersTab />
//               </Motion.div>
//             )}
//           </TabsContent>

//           <TabsContent value="settings">
//             {activeTab === "settings" && (
//               <Motion.div
//                 variants={tabFade}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 transition={{ duration: 0.3 }}
//               >
//                 <SettingsTab />
//               </Motion.div>
//             )}
//           </TabsContent>
//         </div>
//       </Tabs>
//     </div>
//   );
// };

// export default Profile;


import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion as Motion } from "framer-motion";
import { useState } from "react";
import { User, CalendarCheck, ShoppingBag, Settings } from "lucide-react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import ProfileTab from "./components/ProfilesTab";
import ReservationsTab from "./components/ReservationsTabs";
import OrdersTab from "./components/OrdersTab.jsx";
import SettingsTab from "./components/Settings.jsx";

const tabs = [
  { value: "profile", label: "Profile", icon: User },
  { value: "reservations", label: "Reservations", icon: CalendarCheck },
  { value: "orders", label: "Orders", icon: ShoppingBag },
  { value: "settings", label: "Settings", icon: Settings },
];

const tabFade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-4 py-8 md:px-10 bg-[#ffffff] text-foreground">
      {/* Back Arrow */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-700 hover:text-black mb-6"
      >
        <IoArrowBack className="text-2xl" />
        <span className="text-base">Back to Home</span>
      </button>

      <h2 className="text-4xl font-bold mb-8 tracking-wide">Account Dashboard</h2>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col md:flex-row gap-6 tracking-wider"
      >
        {/* Responsive Sidebar */}
        <aside className="w-full md:w-64 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          {tabs.map(({ value, label, icon: Icon }) => (
            <Button
              key={value}
              variant={activeTab === value ? "default" : "ghost"}
              onClick={() => setActiveTab(value)}
              className="flex-shrink-0 md:w-full justify-start md:justify-start gap-2"
            >
              <Icon className="w-5 h-5" />
              <span className="inline tracking-wider">{label}</span>
            </Button>
          ))}
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <TabsContent value="profile">
            {activeTab === "profile" && (
              <Motion.div
                variants={tabFade}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <ProfileTab />
              </Motion.div>
            )}
          </TabsContent>

          <TabsContent value="reservations">
            {activeTab === "reservations" && (
              <Motion.div
                variants={tabFade}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <ReservationsTab />
              </Motion.div>
            )}
          </TabsContent>

          <TabsContent value="orders">
            {activeTab === "orders" && (
              <Motion.div
                variants={tabFade}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <OrdersTab />
              </Motion.div>
            )}
          </TabsContent>

          <TabsContent value="settings">
            {activeTab === "settings" && (
              <Motion.div
                variants={tabFade}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <SettingsTab />
              </Motion.div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Profile;
