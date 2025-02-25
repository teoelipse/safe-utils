"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const particles: Particle[] = []
    const particleCount = 50
    
    // Set the background color based on theme
    const setBackgroundColor = () => {
      if (isDark) {
        // Dark blue background for dark mode
        canvas.style.backgroundColor = "#000000"
      } else {
        // Light blue-white background for light mode
        canvas.style.backgroundColor = "#F9F9FB"
      }
    }
    
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      canvasWidth: number
      canvasHeight: number

      constructor() {
        this.canvasWidth = canvas?.width || window.innerWidth
        this.canvasHeight = canvas?.height || window.innerHeight
        this.x = Math.random() * this.canvasWidth
        this.y = Math.random() * this.canvasHeight
        this.size = Math.random() * 5 + 1
        this.speedX = (Math.random() * 1.5 - 0.75) * 0.75
        this.speedY = (Math.random() * 1.5 - 0.75) * 0.75
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > this.canvasWidth) this.x = 0
        else if (this.x < 0) this.x = this.canvasWidth

        if (this.y > this.canvasHeight) this.y = 0
        else if (this.y < 0) this.y = this.canvasHeight
      }

      draw() {
        // Use different colors for dark and light modes with reduced opacity for light mode
        ctx!.fillStyle = isDark 
          ? "rgba(255, 255, 255, 0.3)" 
          : "rgba(0, 0, 0, 0.3)" // Reduced opacity for light mode
        
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.closePath()
        ctx!.fill()
      }
    }

    const init = () => {
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const particle of particles) {
        particle.update()
        particle.draw()
      }
      
      // Draw connections between particles
      drawConnections()
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    const drawConnections = () => {
      const maxDistance = 100
      
      // Reduced opacity for connections in light mode
      ctx.lineWidth = 0.5
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance)
            ctx.strokeStyle = isDark 
              ? `rgba(255, 255, 255, ${opacity * 0.3})` 
              : `rgba(0, 0, 0, ${opacity * 0.3})` // Significantly reduced opacity for light mode
              
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setBackgroundColor()
      init()
    }

    resizeCanvas()
    animate()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isDark])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none" 
    />
  )
}

export default AnimatedBackground

