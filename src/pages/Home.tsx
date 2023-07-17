import { useEffect, useState } from "react";
import { formatCurrency } from "../utils/formatCurrency";
import { BsCurrencyDollar } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import DashboardService from "../services/DashboardService";
import { DashboardCardInfo } from "../interfaces/Dashboard.interface";
import { DashboardCard } from "../components/DashboardCard";
import { Top5Customers } from "../components/Top5Customers";
import { Top5Products } from "../components/Top5Products";

interface DashboardCard {
  title: string;
  theme: {
    cardTheme: string;
    iconTheme: string;
  };
  label: string | number;
  icon: JSX.Element;
}

export const Home = (): JSX.Element => {
  const [cardInfo, setCardInfo] = useState<DashboardCardInfo | null>(null);

  useEffect(() => {
    DashboardService.getDashboardCardInfo().then((response) =>
      setCardInfo(response)
    );
  }, []);

  const cardStyles = (
    backgroundColor: string,
    textColor: string,
    borderColor: string
  ) => {
    return `flex items-center justify-center gap-3 p-5 ${backgroundColor} ${textColor} border-l-4 ${borderColor} rounded drop-shadow-md`;
  };

  const iconStyles = (backgroundColor: string) => {
    return `h-10 w-10 ${backgroundColor} flex justify-center items-center text-xl text-white rounded-full`;
  };

  const cards: DashboardCard[] = [
    {
      title: "Ingresos últimos 7 días",
      theme: {
        cardTheme: cardStyles(
          "bg-green-200",
          "text-green-900",
          "border-green-600"
        ),
        iconTheme: iconStyles("bg-green-600"),
      },
      label: cardInfo ? formatCurrency(cardInfo.totalLast7Days) : "",
      icon: <BsCurrencyDollar />,
    },
    {
      title: "Nuevos clientes 7 días",
      theme: {
        cardTheme: cardStyles(
          "bg-blue-200",
          "text-blue-900",
          "border-blue-600"
        ),
        iconTheme: iconStyles("bg-blue-600"),
      },
      label: cardInfo ? "+ " + cardInfo.newCustomersLast7Days : "",
      icon: <AiOutlineUser />,
    },
    {
      title: "Productos Registrados",
      theme: {
        cardTheme: cardStyles(
          "bg-indigo-200",
          "text-indigo-900",
          "border-indigo-600"
        ),
        iconTheme: iconStyles("bg-indigo-600"),
      },
      label: cardInfo ? cardInfo.totalProducts : "",
      icon: <FiShoppingCart />,
    },
    {
      title: "Categorias Registradas",
      theme: {
        cardTheme: cardStyles(
          "bg-fuchsia-200",
          "text-fuchsia-900",
          "border-fuchsia-600"
        ),
        iconTheme: iconStyles("bg-fuchsia-600"),
      },
      label: cardInfo ? cardInfo.totalCategories : "",
      icon: <MdOutlineDashboard />,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-10">
        Home
        <div className="flex flex-wrap justify-center gap-3">
          {cards.map((card, i) => (
            <DashboardCard
              key={i}
              title={card.title}
              label={card.label}
              icon={card.icon}
              cardTheme={card.theme.cardTheme}
              iconTheme={card.theme.iconTheme}
            />
          ))}
        </div>
        <div className="flex justify-center gap-8 flex-wrap">
          <Top5Customers />
          <Top5Products />
        </div>
      </div>
    </>
  );
};
