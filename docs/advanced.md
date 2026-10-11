---
id: advanced
title: 導入方法（Advanced モード）
sidebar_label: 導入方法（Advanced モード）
description: Advanced モードの各パーツの配置、炭とフレーバの設定、VR での動作確認。
---

## 1. UnityPackageのインポート

UnityPackageをワールドのプロジェクト内にインポートします。

mikinel Shisha Systemは`Assets/mikinel` 内にインポートされます。

![インポートされたファイル群](/img/notion/advanced/figure-21.png)

インポートされたファイル群

:::tip[ヒント]

AdvancedモードのShishaが配置されたサンプルシーンは`Assets/mikinel/Shisha/ShishaDemo_Advanced.unity` にあります。

:::

## 2. ルートオブジェクトの配置

まず、`Assets/mikinel/Shisha/Prefabs/ShishaSystem_Root.prefab` をシーンに配置します。

:::warning[注意]

mikinel Shisha Systemでは、ShishaSystem_Root.prefabを先に配置してから、その子階層にシーシャに関連するPrefabを配置していく必要があります。
この配置にしなかった場合、正常にギミックが動作しません。

:::

![ShishaSystem_Root.prefabをシーンに配置](/img/notion/advanced/figure-01.png)

ShishaSystem_Root.prefabをシーンに配置

## 3. 各オブジェクトの配置

`Assets/mikinel/Shisha/Prefabs/Advanced`のフォルダ内にあるPrefabがAdvancedモードで使用するPrefab群です。

`Assets/mikinel/Shisha/Prefabs/Flavor` にフレーバのPrefabは入っています。

- シーシャ本体
- トップ
- ヒートシステム
- フタ
- 炭箱
- 火ばさみ
- コンロ
- 炭ホルダー
- フレーバ

の9種類のオブジェクト配置する必要があります。

それぞれのPrefabは2で配置したShishaSystem_Rootの子階層に配置を行います。

:::tip[ヒント]

シーシャ本体にはトップとヒートシステム、フタが1つずつ接続可能ですが、必要であればトップ、ヒートシステム、フタはシーシャ本体の台数と一致している必要はありません。

:::

### シーシャ本体

![様々な種類のシーシャ本体のPrefab](/img/notion/advanced/figure-12.png)

様々な種類のシーシャ本体のPrefab

パイプが1本のもの、2本のもの、アイスホースのものなどの種類があります。

お好みのものを配置してください。

### トップ

![Untitled](/img/notion/advanced/figure-14.png)

フレーバをセットするパーツ。シーシャ本体に接続可能。

### ヒートシステム

![Untitled](/img/notion/advanced/figure-15.png)

炭を乗せるパーツ。トップに接続可能。

:::tip[ヒント]

炭は最大で3つ乗せることができます。炭の数が大きいほどフレーバの加熱が早くなります。

:::

### フタ

![Untitled](/img/notion/advanced/figure-16.png)

ヒートシステムに被せるパーツ。飾り。

### 炭箱

![Untitled](/img/notion/advanced/figure-17.png)

炭が27個入った箱。

![Untitled](/img/notion/advanced/figure-18.png)

箱が不要の場合は炭を直接配置することも可能です。

:::tip[ヒント]

炭の燃焼速度を変更するには炭オブジェクトのルートにあるCharcoalManagerコンポーネントの設定を変更してください。

![Untitled](/img/notion/advanced/figure-19.png)

TimeToBurn : コンロの上に載せて熱量が100%になるまでの秒数 (デフォルト 30秒)
TimeToCoolDown : 熱量100%から0%になるまでの秒数 (デフォルト 900秒=15分)

:::

### 火ばさみ

![Untitled](/img/notion/advanced/figure-20.png)

炭を掴む火ばさみです。

炭は手で直接持つこともできますが、ｱﾁﾁなのでこれを使います。

### コンロ

![Untitled](/img/notion/advanced/figure-02.png)

この上に炭を乗せることで炭を加熱できます。

### 炭ホルダー

![Untitled](/img/notion/advanced/figure-03.png)

炭をまとめて運ぶためのものです。最大9個炭を載せられます。

必要に応じて配置してください。

### フレーバ

![Untitled](/img/notion/advanced/figure-04.png)

香り付け(吐く煙の色付け)をするためのフレーバです。

複数のデザインを用意しました。お好みのものをご使用下さい。

大きいボトルと小さいボトルの機能の差はありません。

フレーバをシーンに配置後、FlavorServerコンポーネントの設定を変更することで、そのフレーバの色の変更が可能です。

![FlavorServerコンポーネント](/img/notion/advanced/figure-05.png)

FlavorServerコンポーネント

FlavorColorTypeを切り替えることで、1色、2色グラデーションの切り替えが可能です。

![SingleモードとGradientモード](/img/notion/advanced/figure-06.png)

SingleモードとGradientモード

これらの配置を行った後、ShishaSystem_Rootオブジェクト下にはこのようにオブジェクトが配置されている状態になります。

![シーンに配置を行った例](/img/notion/advanced/figure-07.png)

シーンに配置を行った例

## 4. 動作確認、アップロード

Advancedモードはオブジェクトの操作が複雑なため、デスクトップモードでの操作が難しいです。

VR内での検証をおすすめします。

![フレーバをトップに当てたときにフレーバがセットされるか？](/img/notion/advanced/figure-08.png)

フレーバをトップに当てたときにフレーバがセットされるか？

![炭が加熱できるか？](/img/notion/advanced/figure-09.png)

炭が加熱できるか？

![炭ホルダーに炭が載るか？](/img/notion/advanced/figure-10.png)

炭ホルダーに炭が載るか？

![ヒートシステムに炭がセットできるか？](/img/notion/advanced/figure-11.png)

ヒートシステムに炭がセットできるか？

![全てを接続してシーシャを吸うことができるか？](/img/notion/advanced/figure-13.png)

全てを接続してシーシャを吸うことができるか？

:::tip[ヒント]

明るいワールドよりも暗いワールドの方が煙が映えます

:::
