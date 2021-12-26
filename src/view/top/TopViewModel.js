import { OpeningContent } from "../../content/OpeningContent";

/**
 * @class
 * @extends {next2d.fw.ViewModel}
 */
export class TopViewModel extends next2d.fw.ViewModel
{
    /**
     * @param {next2d.fw.View} view
     * @constructor
     * @public
     */
    constructor (view)
    {
        super(view);
    }

    /**
     * @param  {next2d.fw.View} view
     * @return {Promise|void}
     * @public
     */
    bind (view)
    {
        return new Promise((resolve) =>
        {
            // オープニングのMovieClipを動的に生成
            const content = view.addChild(new OpeningContent());
            content.name  = "opening";

            // ラベルをつけたフレーム番号を次の処理に引き継ぐ
            const labels = content.currentLabels;
            for (let idx = 0; labels.length > idx; ++idx) {
                const label = labels[idx];
                if (label.name === "end") {
                    resolve(label.frame);
                }
            }
        })
            .then((frame) =>
            {
                const { Sprite }     = next2d.display;
                const { MouseEvent } = next2d.events;

                // 透明なタップエリアを生成
                const sprite = view.addChild(new Sprite());
                const stage  = this.config.stage;
                sprite
                    .graphics
                    .beginFill(0, 0)
                    .drawRect(0, 0, stage.width, stage.height);

                // PC版でマウスがポインターに切り替わるように設定をONにする
                sprite.buttonMode = true;

                // マウスアップもしくはタップエンドでイベント発火
                sprite.addEventListener(MouseEvent.MOUSE_UP, (event) =>
                {
                    const parent = event.currentTarget.parent;
                    if (frame > parent.opening.currentFrame) {

                        // フレームがラベル位置前であればラベル位置まで移動
                        parent.opening.gotoAndPlay("end");

                    } else {

                        // HomeViewに移動
                        this.app.gotoView("home");

                    }
                });
            });
    }
}