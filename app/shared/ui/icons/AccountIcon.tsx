export default function AccountIcon(
  props: Readonly<React.SVGProps<SVGSVGElement>>,
) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M12 14C14.76 14 17 11.76 17 9C17 6.24 14.76 4 12 4C9.24 4 7 6.24 7 9C7 11.76 9.24 14 12 14ZM12 5.5C13.93 5.5 15.5 7.07 15.5 9C15.5 10.93 13.93 12.5 12 12.5C10.07 12.5 8.5 10.93 8.5 9C8.5 7.07 10.07 5.5 12 5.5ZM18.75 18V20H17.25V18C17.25 17.31 16.69 16.75 16 16.75H8C7.31 16.75 6.75 17.31 6.75 18V20H5.25V18C5.25 16.48 6.48 15.25 8 15.25H16C17.52 15.25 18.75 16.48 18.75 18Z"
        fill="currentColor"
      />
    </svg>
  );
}
