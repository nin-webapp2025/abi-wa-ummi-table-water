import { formatNaira } from '../utils/helpers';

interface SimpleChartProps {
  data: { label: string; value: number }[];
  color?: string;
  title: string;
}

export const SimpleChart: React.FC<SimpleChartProps> = ({ data, color = '#0ea5e9', title }) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-gray-700">{item.label}</span>
                <span className="font-bold text-gray-900">{formatNaira(item.value)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      {data.length === 0 && (
        <p className="text-center text-gray-500 py-8">No data available</p>
      )}
    </div>
  );
};
