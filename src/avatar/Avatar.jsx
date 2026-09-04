import avatarStatic from '../assets/avatar-static.webp'
import { AVATAR_POSES } from './avatarConfig'

/**
 * Avatar — a single static illustration, cropped consistently across the
 * site via `pose`. No rigging, no click-to-wave, no idle motion.
 *
 * Earlier versions of this component tried to animate a wave gesture by
 * splitting the source art into moving layers. That never read as natural
 * no matter how the joints/easing were tuned, so per direct feedback this
 * has been replaced with the original flattened artwork shown as a plain
 * image. See avatar/README.md for the full history if this is ever
 * revisited with proper animated source art (e.g. a hand-drawn wave
 * sprite sheet or a short GIF/video clip) instead of code-driven rigging.
 */
export default function Avatar({ pose = 'half', className = '', ariaLabel = 'Illustration of Roshni Singh' }) {
  const poseConfig = AVATAR_POSES[pose] ?? AVATAR_POSES.half

  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: `${poseConfig.aspect}` }}>
      <div
        className="absolute top-1/2 left-1/2"
        style={{
          height: `${poseConfig.zoom}%`,
          aspectRatio: '1 / 1',
          transform: `translate(${poseConfig.x}%, ${poseConfig.y}%)`,
        }}
      >
        <img
          src={avatarStatic}
          alt={ariaLabel}
          draggable={false}
          className="absolute inset-0 block h-full w-full max-w-none pointer-events-none select-none"
        />
      </div>
    </div>
  )
}
