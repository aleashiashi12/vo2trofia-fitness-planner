import React from 'react';

interface ChartDataItem {
  label: string;
  value: number;
}

interface WorkoutBarChartProps {
  data: ChartDataItem[];
}

const WorkoutBarChart: React.FC<WorkoutBarChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value), 1); // Use 1 to avoid division by zero

  return (
    <div className="space-y-4 p-2">
      {data.map((item, index) => {
        const barPercentage = (item.value / maxValue) * 100;
        return (
          <div 
            key={index} 
            className="flex items-center gap-2 sm:gap-4 animate-row-in" 
            style={{ animationDelay: `${index * 75}ms` }}
          >
            <div className="w-1/3 text-right">
              <span className="text-sm text-brand-muted truncate" title={item.label}>
                {item.label}
              </span>
            </div>
            <div className="w-2/3">
              <div className="w-full bg-brand-light rounded">
                <div 
                  className="bg-brand-purple h-8 rounded flex items-center justify-end px-2"
                  style={{ width: `${barPercentage}%`, transition: 'width 0.5s ease-out', minWidth: '28px' }}
                >
                  <span className="font-bold text-white text-sm">{item.value}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const style = document.createElement('style');
if (!document.getElementById('workout-barchart-styles')) {
    style.id = 'workout-barchart-styles';
    style.innerHTML = `
      @keyframes row-in {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      .animate-row-in {
        animation: row-in 0.4s ease-out forwards;
        opacity: 0;
      }
    `;
    document.head.appendChild(style);
}

export default WorkoutBarChart;