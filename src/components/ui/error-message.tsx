export default function ErrorMessage({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-red-500 mt-1 peer-aria-invalid:text-destructive text-xs"> {children} </p>
    )
}