import { useState, useEffect } from 'react'

export const useWorkoutOverview = () => {
  const [isLoading, setIsLoading] = useState(true)

  const [data, setData] = useState({
    today: {
      routine: 'Peito e Tríceps',
      exercises: 6,
      duration: 55,
      intensity: 'Alta',
    },
    weeklyStats: [
      { label: 'Volume Total', value: '12.5k kg', trend: '+8%' },
      { label: 'Tempo Médio', value: '62 min', trend: '-2 min' },
    ],
    history: [
      { id: '1', routine: 'Costas e Bíceps', date: 'Ontem', duration: '58 min' },
      { id: '2', routine: 'Pernas', date: '3 dias atrás', duration: '75 min' },
      { id: '3', routine: 'Ombros', date: '5 dias atrás', duration: '45 min' },
    ],
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return { isLoading, data }
}
