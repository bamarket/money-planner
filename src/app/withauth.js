import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spin } from 'antd';

const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        setTimeout(() => {
          console.log("loading");
        }, 3000); // Simulate loading delay
        
        const token = localStorage.getItem("tokenmoneyplanner");
        if (!token) {
          router.push("/login"); // Redirect to login if no token is found
        } else {
          setLoading(false); // Stop loading when authentication is complete
        }
      };

      checkAuth();
    }, [router]);

    if (loading) {
      // Display a loading spinner with custom size
      return (
          <Spin size="large" className="spinner-container"/>
      );
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
};

export default withAuth;
