import { Typography } from "@mui/material";

interface Props {
  title: string;
  label: string | number;
  icon: JSX.Element;
  cardTheme: string;
  iconTheme: string;
}

export const DashboardCard = ({ title, label, icon, cardTheme, iconTheme }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
        <div className={cardTheme}>
          <div>
            <Typography variant="button">{title}</Typography>
            <p className="text-xl font-bold">{label}</p>
          </div>
          <div className={iconTheme}>{icon}</div>
        </div>
    </div>
  );
};
