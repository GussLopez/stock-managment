export default function ErrorMessage({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-red-600 dark:text-red-400 font-medium text-sm rounded my-1"> {children} </p>
    )
}