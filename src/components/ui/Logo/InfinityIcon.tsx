interface InfinityIconProps {
  className?: string;
}

export default function InfinityIcon({ className }: InfinityIconProps) {
  return (
    <svg
      className={className}
      viewBox='0 0 90 46'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
    >
      <path
        d='M 45,23 C 45,6 5,6 5,23 C 5,40 45,40 45,23 C 45,6 85,6 85,23 C 85,40 45,40 45,23'
        stroke='var(--color-text)'
        strokeWidth='6.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
    </svg>
  );
}