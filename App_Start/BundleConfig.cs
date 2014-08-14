using System.Web.Optimization;

namespace ReservationSystem.App_Start
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/basic").Include(
                        "~/Scripts/underscore.js",
                        "~/Scripts/moment.js",
                        "~/Scripts/angular.js",
                        "~/Scripts/angular-route.js",
                        "~/Scripts/angular-resource.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                    "~/Scripts/reservationApp/reservationApp.js"
                ).IncludeDirectory("~/Scripts/reservationApp/controllers", "*.js"));
            

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));
        }
    }
}