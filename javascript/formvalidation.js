$("form").submit(function(event)
{
    function changeP(message)
    {
        $("p.mutating-text").text(message).show();
        /* prevent the page from resetting */
        event.preventDefault();
    }
    if ($("input:first").val() === "gui")
    {
        changeP("You have succeeded.");
    }
    else
    {
        changeP("That is not the correct word.");
    }
});