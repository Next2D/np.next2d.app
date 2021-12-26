/**
 * @class
 * @extends {next2d.fw.Context}
 */
export class TimeBarContent extends next2d.fw.Content
{
    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        super();
    }

    /**
     * @return {string}
     */
    get namespace ()
    {
        return "TimeBar";
    }

    /**
     * @return {string}
     */
    get contentName ()
    {
        return "MaterialContent";
    }
}