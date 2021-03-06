$(function () {
    $.fn.datepicker.dates["hu"] = {
        days: [
            "vasárnap",
            "hétfő",
            "kedd",
            "szerda",
            "csütörtök",
            "péntek",
            "szombat",
        ],
        daysShort: ["vas", "hét", "ked", "sze", "csü", "pén", "szo"],
        daysMin: ["V", "H", "K", "Sze", "Cs", "P", "Szo"],
        months: [
            "január",
            "február",
            "március",
            "április",
            "május",
            "június",
            "július",
            "augusztus",
            "szeptember",
            "október",
            "november",
            "december",
        ],
        monthsShort: [
            "jan",
            "feb",
            "már",
            "ápr",
            "máj",
            "jún",
            "júl",
            "aug",
            "sze",
            "okt",
            "nov",
            "dec",
        ],
        today: "ma",
        weekStart: 1,
        clear: "Töröl",
        titleFormat: "yyyy. MM",
        format: "yyyy-mm-dd",
    };
    $("#datepicker").datepicker({
        // format: "yyyy-mm-dd",
        startView: 2,
        clearBtn: true,
        language: "hu",
        autoclose: true,
        toggleActive: true,
        endDate: '-18y'
        // defaultViewDate: { year: 2003, month: 04, day: 25 },
       
    });
});