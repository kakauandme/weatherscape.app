export function onRequest(context) {

    return new Response(
        JSON.stringify({ city: "Melbourne, Australia" }),
        {
            headers: {
                "content-type": "application/json;charset=UTF-8",
            },
        }
    )
}