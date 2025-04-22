import React from 'react';
import { Skill } from '../../types';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SkillChartProps {
  skills: Skill[];
}

const SkillChart: React.FC<SkillChartProps> = ({ skills }) => {
  // Group skills by category
  const groupedSkills: Record<string, Skill[]> = {};
  
  skills.forEach(skill => {
    const category = skill.category;
    if (!groupedSkills[category]) {
      groupedSkills[category] = [];
    }
    groupedSkills[category].push(skill);
  });

  // Chart color scheme based on categories
  const categoryColors = {
    frontend: 'rgba(59, 130, 246, 0.7)', // blue
    backend: 'rgba(124, 58, 237, 0.7)',  // purple
    devops: 'rgba(249, 115, 22, 0.7)',   // orange
    soft: 'rgba(16, 185, 129, 0.7)',      // green
    other: 'rgba(156, 163, 175, 0.7)'    // gray
  };

  // Prepare chart data
  const chartData = {
    labels: skills.map(skill => skill.name),
    datasets: [
      {
        label: 'Skill Proficiency',
        data: skills.map(skill => skill.proficiency),
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        pointHoverRadius: 5,
        pointRadius: 4,
      }
    ]
  };
  
  // Chart options
  const chartOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          backdropColor: 'transparent',
          color: 'rgba(107, 114, 128, 0.7)',
        },
        grid: {
          color: 'rgba(209, 213, 219, 0.4)',
        },
        angleLines: {
          color: 'rgba(209, 213, 219, 0.4)',
        },
        pointLabels: {
          color: 'rgba(55, 65, 81, 1)',
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: 'rgba(17, 24, 39, 1)',
        bodyColor: 'rgba(17, 24, 39, 1)',
        borderColor: 'rgba(229, 231, 235, 1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (tooltipItems: any) => {
            return tooltipItems[0].label;
          },
          label: (context: any) => {
            return `Proficiency: ${context.parsed.r}%`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 h-80">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skill Radar</h3>
      <div className="h-[calc(100%-2rem)] w-full">
        <Radar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default SkillChart;