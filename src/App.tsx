import { MotionConfig } from 'motion/react'
import { HomePage } from './pages/HomePage'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HomePage />
    </MotionConfig>
  )
}
