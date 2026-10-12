---
id: quick-installation
title: クイックインストール
sidebar_label: クイックインストール
description: Basic・Advanced モードの導入に必要な手順をまとめています。
---

![ShishaSystem_RootとシーシャのPrefabを配置する簡易設置手順](/img/quick-installation/setup-guide.png)

1. unitypackageインポート
2. まず`Assets/mikinel/Shisha/Prefabs/ShishaSystem_Root.prefab`をシーンに配置
3. Prefabをシーンに配置
    1. <span class="shisha-mode-badge shisha-mode-basic">Basicモード</span>でシーシャを使用する場合
        1. 2で配置したShishaSystem_Rootの子階層に`Assets/mikinel/Shisha/Prefabs/Basic`内のPrefabを配置
        2. 色を変えられるようにする場合は、2で配置したShishaSystem_Rootの子階層に`Assets/mikinel/Shisha/Prefabs/Flavor` 内のフレーバのPrefabを配置
    2. <span class="shisha-mode-badge shisha-mode-advanced">Advancedモード</span>でシーシャを使用する場合
        1. 2で配置したShishaSystem_Rootの子階層に`Assets/mikinel/Shisha/Prefabs/Advanced`内のPrefabを配置
        2. 2で配置したShishaSystem_Rootの子階層に`Assets/mikinel/Shisha/Prefabs/Flavor` 内のフレーバのPrefabを配置

詳しい手順は、[Basic モードの導入方法](./basic.md)・[Advanced モードの導入方法](./advanced.md)をご覧ください。
