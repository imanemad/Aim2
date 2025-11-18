interface SubmitType{
    isPending: boolean,
    title: string,
}

export default function SubmitBtn({isPending, title}:SubmitType) {

    return (
        <div className="text-end Form-Item">
            <button
                className={`Btn Btn-Black m-0 mt-4 ${isPending ? "opacity-50" : ""}`}
                type="submit"
                disabled={isPending}
            >
                {isPending ? `در حال ${title}...` : `${title}`}
            </button>
        </div>
    )
}
